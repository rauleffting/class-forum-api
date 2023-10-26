import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  static create(
    props: InstructorProps, // With the Optional hack, we don't need to pass the createdAt propertie to create a question
    id?: UniqueEntityID,
  ) {
    const instructor = new Instructor(props, id)

    return instructor
  }
}
