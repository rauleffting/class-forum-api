import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface StudentProps {
  name: string
}
export class Student extends Entity<StudentProps> {
  static create(
    props: StudentProps, // With the Optional hack, we don't need to pass the createdAt propertie to create a question
    id?: UniqueEntityID,
  ) {
    const student = new Student(props, id)

    return student
  }
}
