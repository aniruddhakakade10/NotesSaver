import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, resetAllPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { MdOutlineContentCopy } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";

const Home = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes)


    function createMyPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId ||
                Date.now().toString(36) + Math.random().toString(36).substring(2),
            createdAt: new Date().toISOString(),
        }

        if (pasteId) {
            //update the paste id
            dispatch(updateToPastes(paste));
        }
        else {
            //create a new paste
            dispatch(addToPastes(paste));
        }

        //after creating or updating paste,
        setTitle("");
        setValue("");
        setSearchParams({});
    };

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPastes])

    return (
        <div className='w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0'>
            <div className="flex flex-col gap-y-5 items-start">
                <div className='w-full flex flex-row gap-x-4 justify-between items-center'>
                    <input
                        type='text'
                        placeholder='Enter title here...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`${pasteId ? "w-[80%]" : "w-[85%]"
                            } text-black border border-input rounded-md p-2`}
                    />
                    <button
                        onClick={createMyPaste}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                        {
                            pasteId ? "Update My paste" : "Create My paste"
                        }
                    </button>

                    {
                        pasteId &&
                        <button
                            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700'
                            onClick={resetAllPastes}
                        >
                            <AiFillPlusCircle size={20} />
                        </button>}
                </div>

                <div
                    className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
                >
                    <div
                        className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
                    >
                        <div className="w-full flex gap-x-[6px] items-center select-none group">
                            <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

                            <div
                                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
                            />

                            <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
                        </div>
                        {/* Circle and copy btn */}
                        <div
                            className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
                        >
                            {/*Copy  button */}
                            <button
                                className={`flex justify-center items-center transition-all duration-300 ease-in-out group`}
                                onClick={() => {
                                    navigator.clipboard.writeText(value);
                                    toast.success("Copied to Clipboard", {
                                        position: "top-right",
                                    });
                                }}
                            >
                                <MdOutlineContentCopy className="group-hover:text-sucess-500" size={20} />
                            </button>
                        </div>
                    </div>

                    {/* <div className='p-8'> */}
                    <textarea
                        //className='rounded-2xl mt-4 min-w-[700px] p-4 border'
                        value={value}
                        placeholder='Enter the content...'
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full p-3  focus-visible:ring-0"
                        style={{
                            caretColor: "#000",
                        }}
                        rows={20}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;