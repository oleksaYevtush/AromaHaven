import React, { useState, useEffect, useCallback } from 'react';
import { Header, MainContainer, AboutUs, Footer } from 'components';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useStateValue } from 'context/StateProvider';
import { getAllAromaItems } from 'utils/firebaseFunction';
import { actionType } from 'context/reducer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import ChatComponent from './components/ChatComponent';

const App = () => {
  const [{ aromaItems }, dispatch] = useStateValue();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const fetchData = useCallback(async () => {
    const data = await getAllAromaItems();
    dispatch({
      type: actionType.SET_AROMA_ITEMS,
      aromaItems: data,
    });
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/chat', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <AnimatePresence>
      <div className="flex flex-col w-screen h-auto bg-primary">
        <Header />
        <main className="items-center justify-center w-full h-full bg-[#160c16] bg-center">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/aboutUs" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer />
        <ChatComponent />
      </div>
      <Analytics />
      <SpeedInsights/>
    </AnimatePresence>
  );
};

export default App;
