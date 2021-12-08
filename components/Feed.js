import { SparklesIcon } from '@heroicons/react/solid'
import { SparklesOutline } from 'heroicons-react'
import React from 'react'
import Input from './Input'

function Feed() {
    return (
        <div className="text-white flex-grow border-l border-r border-gray-800 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
            <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
                <h2 className="text-base font-bold sm:text-lg">Home</h2>
                <div className="flex items-center justify-center ml-auto hoverAnimation w-9 h-9 xl:px-0"> 
                    <SparklesOutline className="h-5 text-white"/>
                </div>
            </div>

            <Input/>
        </div>
    )
}

export default Feed
