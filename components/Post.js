import React from 'react'

export default function Post({id, post, postPage}) {
    return (
        <div className='flex p-3 border-b border-gray-800 cursor-pointer'>
            {!postPage && (
                <img src={post?.userImg} className='mr-4 rounded-full h-11 w-11'/>
            )}
            <div className='flex flex-col w-full space-y-2'>
                <div className={`flex ${postPage && "justify-between"}`}>
                    {postPage && (
                        <img src={post?.userImg} className='mr-4 rounded-full h-11 w-11'/>
                    )}
                    <div className='text-[#6e767d]'>
                        <div className='inline-block group'>
                            <h4 className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] 
                                group-hover:underline ${!postPage && "inline-block"}`}>{post?.username}</h4>
                            <span className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}>@{post?.tag}</span>
                        </div>{" "}
                        .{" "}
                        <span className='hover:underline text-sm sm:text-[15px]'>
                            {/* <Moment fromNow>{post?.timestamp?.toDate()}</Moment> */}
                        </span>
                        {!postPage &&( <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>{post?.text}</p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
