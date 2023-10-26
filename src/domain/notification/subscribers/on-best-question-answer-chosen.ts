import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../application/use-cases/send-notification'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { BestQuestionAnswerChosenEvent } from '@/domain/forum/enterprise/entities/events/best-question-answer-chosen-event'

export class OnBestQuestionAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendBestQuestionAnswerNotification.bind(this), // bind is for using the function as OnAnswerCreated, not the other classes like DomainEvents
      BestQuestionAnswerChosenEvent.name,
    )
  }

  private async sendBestQuestionAnswerNotification({
    question,
    bestAnswerId,
  }: BestQuestionAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: question?.authorId.toString(),
        title: `Your answer was chosen!`,
        content: `The answer you sent at "${question.title.substring(
          0,
          20,
        )}" was chosen by the author!`,
      })
    }
  }
}
