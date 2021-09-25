import React, {useEffect, useState} from 'react'

export const Tags = ({value, onChange, tags}) => {
  const [selectedTag, setSelectedTag] = useState(value)

  useEffect(() => {
    setSelectedTag(value)
  }, [value])

  const handleSelectedTag = (tag) => {
    setSelectedTag(tag)
    onChange(tag)
  }

  return (
    <div>
      <div className="flex my-2">
        {tags?.map((tag) => (
          <div
            key={tag}
            onClick={() => handleSelectedTag(tag)}
            className={`${
              selectedTag === tag ? 'bg-blue-500' : 'bg-gray-400'
            } text-white rounded-full px-2 py-0.5 mr-1 text-xs cursor-pointer`}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  )
}
