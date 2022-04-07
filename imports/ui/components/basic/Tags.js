import React, {useEffect, useState} from 'react'

export const Tags = ({tags, selectedTag, onChangeTag, onAddTag, onRemoveTag, addTagPlaceholder}) => {
  const [selected, setSelected] = useState(selectedTag)
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    setSelected(selectedTag)
  }, [selectedTag])

  const handleAddTag = () => {
    onAddTag(newTag.replace(/ /g, ''))
    setNewTag('')
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1 my-2">
        {tags?.map((tag) => (
          <div
            key={tag}
            onClick={() => {
              setSelected(tag)
              onChangeTag(tag)
            }}
            className={`${
              selected === tag ? 'bg-purple-500' : 'bg-gray-400'
            } text-white rounded-full px-2 py-0.5 text-xs cursor-pointer`}
          >
            {tag}
            <button
              type="button"
              onClick={() => {
                onRemoveTag(tag)
              }}
              className="ml-1 font-light opacity-75"
            >
              x
            </button>
          </div>
        ))}
        <input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddTag()
            }
          }}
          onBlur={() => {
            handleAddTag()
          }}
          placeholder={addTagPlaceholder}
          className="px-1 py-0.5 border rounded-sm w-20"
        />
      </div>
    </div>
  )
}
