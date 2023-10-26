import { vi } from 'vitest'
import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

// fake event -> create event after aggregate is created / identify event
class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

// fake entity -> create aggregate
class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // subscriber registered (listening to the 'created answer' event)
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name) // 2. register(function-to-execute, event-to-listen)

    // creating answer, but without saving it in the DB
    const aggregate = CustomAggregate.create() // 1. create entity

    // ensure the event is created but it's not dispatched
    expect(aggregate.domainEvents).toHaveLength(1)

    // saving the answer in the database and dispatching the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id) // 3. repository is going to call this to dispatch events

    // the subscriber listen to the event and do what is needed with the data
    expect(callbackSpy).toHaveBeenCalled()

    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
