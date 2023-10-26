import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { AnswerComment } from '../answer-comment'

export class AnswerCommentCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public answerId: UniqueEntityID
  public answerComment: AnswerComment

  constructor(answerComment: AnswerComment, answerId: UniqueEntityID) {
    this.answerComment = answerComment
    this.answerId = answerId
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.answerComment.id
  }
}
