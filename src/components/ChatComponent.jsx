import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { database } from '../firebase.config';
import { ref, push } from 'firebase/database';
import loadingGif from '../img/loading.gif';
import closeIcon from '../img/close.svg';

const ChatComponent = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const chatContainerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const typeMessage = (message) => {
      if (!message) return Promise.resolve('');
        return new Promise(resolve => {
            let i = 0;
            const speed = 150;
            const typedMessage = [];

            const typeInterval = setInterval(() => {
                if (i < message.length) {
                    typedMessage.push(message.charAt(i));
                    i++;
                } else {
                    clearInterval(typeInterval);
                    resolve(typedMessage.join(''));
                }
            }, speed);
        });
    };

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    useEffect(() => {
        const displayMessages = async () => {
            setIsLoading(true);
            const initialMessage = 'Hi, I am your assistant in aromatherapy, what topics are you interested in?';
            setChatHistory([{ sender: 'bot', content: '' }]);

            const typedInitialMessage = await typeMessage(initialMessage);
            setChatHistory([{ sender: 'bot', content: typedInitialMessage }]);

            const options = ["1-What is aromatherapy?", "2-How to choose your favorite flavor", "3-What products are on the site"];
            for (const option of options) {
              await sleep(1000);
              const typedOption = await typeMessage(option);
              setChatHistory(prevHistory => [
                  ...prevHistory.filter(chat => chat.content !== typedOption),
                  { sender: 'bot', content: typedOption }
              ]);
          }
          setIsLoading(false);
        };

        displayMessages();
    }, []);

    const sendMessage = async (messageToSend) => {
      if (messageToSend.trim() === '') return;

      const newMessage = { sender: 'user', content: messageToSend };
      push(ref(database, 'chats'), newMessage);
      setChatHistory(prevHistory => [...prevHistory, newMessage]);
      setMessage('');

      try {
        const response = await axios({
          method: 'get',
          url: 'https://aroma-haven.vercel.app/chat',
          params: { message: messageToSend },
        });
        const botMessage = response.data.content || '';
        const typedBotMessage = await typeMessage(botMessage);
        setChatHistory(prevHistory => [
            ...prevHistory,
            { sender: 'bot', content: typedBotMessage }
        ]);
        push(ref(database, 'chats'), { sender: 'bot', content: botMessage });
    } catch (error) {
        console.error('Error sending message to the server:', error);
    }
  };


    const handleOptionClick = (option) => {
        sendMessage(option.split('. ')[0]);
    };

    if (!isOpen) return null;

    return (
      <div className="fixed bottom-0 left-0 w-[230px] h-[450px] bg-[#151a1d] shadow-lg rounded-t-lg flex flex-col">
          <div className="flex items-center bg-[#151a1d] justify-between p-2">
              <h2 className="text-lg font-semibold text-mainColor">Chat</h2>
              <button onClick={() => setIsOpen(false)} className="text-red-500">
                  <img src={closeIcon} alt="Close" className="w-8 h-8" />
              </button>
          </div>
          <div className="flex-1 p-2 bg-[#3e1d3b] overflow-y-auto" ref={chatContainerRef}>
              {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                      <img src={loadingGif} alt="Loading..." className="w-[145px] h-[135px]" />
                  </div>
              ) : (
                  chatHistory.map((chat, index) => (
                      <div
                          key={index}
                          className={`p-1 my-1 ${chat.sender === 'user' ? 'text-right' : 'text-left'}`}>
                          <span
                              className={`inline-block px-2 py-1 rounded font-['Mogan'] text-[14px] font-semibold ${chat.sender === 'user' ? 'bg-[#151a1dc2] text-[#cbc0c7]' : 'bg-[#cbc0c7] text-[#151a1dc2]'}`}
                              onClick={chat.sender === 'bot' ? () => handleOptionClick(chat.content) : null}
                              style={chat.sender === 'bot' ? { cursor: 'pointer' } : {}}>
                              {chat.content}
                          </span>
                      </div>
                  ))
              )}
          </div>
            <div className="p-2 font-['Mogan']">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter the number..."
                    className="w-full p-2 border rounded text-mainColor"
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage(message)}
                />
                <button onClick={() => sendMessage(message)} className="w-full p-2 mt-2 text-mainColor bg-[#cb57e085] rounded">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatComponent;
