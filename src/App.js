import React, { useEffect, useCallback } from 'react';
import { Header, MainContainer, AboutUs, Footer } from 'components';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useStateValue } from 'context/StateProvider';
import { getAllAromaItems } from 'utils/firebaseFunction';
import { actionType } from 'context/reducer';

const App = () => {
  const [{ aromaItems }, dispatch] = useStateValue();

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
      </div>
    </AnimatePresence>
  );
};

export default App;
