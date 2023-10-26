import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../application/use-cases/send-notification'
import { AnswerCommentCreatedEvent } from '@/domain/forum/enterprise/entities/events/answer-comment-created-event'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

export class OnAnswerCommentCreated implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerCommentNotification.bind(this), // bind is for using the function as OnAnswerCreated, not the other classes like DomainEvents
      AnswerCommentCreatedEvent.name,
    )
  }

  private async sendNewAnswerCommentNotification({
    answerComment,
  }: AnswerCommentCreatedEvent) {
    const answer = await this.answersRepository.findById(
      answerComment.answerId.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer?.authorId.toString(),
        title: `New answer at "${answer.content
          .substring(0, 40)
          .concat('...')}"`,
        content: answerComment.excerpt,
      })
    }
  }
}
