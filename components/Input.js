import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/solid';
import React, { useRef, useState } from 'react'
import 'emoji-mart/css/emoji-mart.css'

import { Picker } from 'emoji-mart'

import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";





function Input() {

    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [loading, setLoading] = useState(false);

    const filePickerRef = useRef(null);


    const sendPost = async () => {
        if (loading) return;
        setLoading(true);
    
        const docRef = await addDoc(collection(db, "posts"), {
        //   id: session.user.uid,
        //   username: session.user.name,
        //   userImg: session.user.image,
        //   tag: session.user.tag,
          text: input,
          timestamp: serverTimestamp(),
        });
    
        const imageRef = ref(storage, `posts/${docRef.id}/image`);
    
        if (selectedFile) {
          await uploadString(imageRef, selectedFile, "data_url").then(async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "posts", docRef.id), {
              image: downloadURL,
            });
          });
        }
    
        setLoading(false);
        setInput("");
        setSelectedFile(null);
        setShowEmojis(false);
    };


    
    //show image
    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
    
        reader.onload = (readerEvent) => {
          setSelectedFile(readerEvent.target.result);
        };
    };

    //to print emojis
    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el)=> codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input+emoji);
    };



    return (
        <div className={`border-b border-gray-800 p-2 flex space-x-3
                        overflow-y-scroll scrollbar-hide ${loading && "opacity-60"}`}>
                            
            <img src="" alt="" className="rounded-full cursor-pointer h-11 w-11 "/>
            <div className="w-full divide-y divide-gray-700">
                <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                    <textarea 
                        value={input} 
                        onChange={(e)=> setInput(e.target.value)}
                        rows="2" 
                        className="bg-transparent outline-none text-[#d9d9d9] 
                        text-base placeholder-gray-500 tracking-wide w-full min-h-[50px]" 
                        placeholder="What`s happening?"/>


                    {selectedFile && (
                        <div className="relative">
                        <div className="absolute w-8  h-8 bg-[#15181c]
                        hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center
                        justify-center top-1 left-1 cursor-pointer" onClick={() => setSelectedFile(null)}
                        >
                            <XIcon className="h-5 text-white"/>
                        </div>
                        <img src={selectedFile} alt="" className="object-contain rounded-2xl max-h-80"></img>
                    </div>
                    )}
                    
                </div>

                {!loading && (

                    <div className="flex justify-between items-center pt-2.5 ">        
                        <div className="flex items-center space-x-2">
                            <div className="icon" onClick={()=> filePickerRef.current.click()}>
                                <PhotographIcon className="h-[20px] text-[#1d9bf0]"/>
                                <input type="file" hidden 
                                    onChange={addImageToPost} 
                                    ref={filePickerRef}/>
                            </div>
                            <div className="rotate-90 icon ">
                                <ChartBarIcon className="text-[#1d9bf0] h-[20px]" />
                            </div>

                            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                                <EmojiHappyIcon className="text-[#1d9bf0] h-[20px]" />
                            </div>

                            <div className="icon">
                                <CalendarIcon className="text-[#1d9bf0] h-[20px]" />
                            </div>
                            {showEmojis && (
                                <Picker 
                                onSelect = {addEmoji}
                                style = {{
                                    position: "absolute",
                                    top: "11rem",
                                    
                                    maxWidth: "280px",
                                    borderRadius: "20px",
                                }}
                                theme="dark"
                                className="scrollbar-hide"/>
                            )}


                        </div>

                        <button
                            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                            disabled={!input.trim() && !selectedFile}
                            onClick={sendPost}
                            >
                            Tweet
                        </button>
                    </div>

                )}
                
            </div>
        </div>
    )
}

export default Input
