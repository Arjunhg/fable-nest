import { Textarea } from '@nextui-org/input'
import React from 'react'

interface StorySubjectInputProps {
  userSelection: (data: { fieldValue: string; fieldName: string }) => void;
}

function StorySubjectInput({ userSelection }: StorySubjectInputProps) {
  return (
    <div className="w-full">
      <label className="font-bold text-2xl sm:text-3xl md:text-4xl text-primary block mb-2">
        1. Subject of the story
      </label>

      <Textarea
        placeholder="Write the subject of the story which you want to generate"
        size="lg"
        classNames={{
          input: 'resize-y min-h-[150px] sm:min-h-[180px] md:min-h-[230px] text-lg sm:text-xl md:text-2xl p-3 sm:p-4 md:p-5'
        }}
        className="mt-2 w-full max-w-full md:max-w-lg"
        onChange={(e) => userSelection({
          fieldValue: e.target.value,
          fieldName: 'storySubject'
        })}
      />
    </div>
  )
}

export default StorySubjectInput