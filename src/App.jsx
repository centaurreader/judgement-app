import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeRoute from './routes/Home';
import { useJudgementApi } from './hooks/useJudgementApi';

function App() {
  const { load: loadJudgementData, data: judgementData } = useJudgementApi();

  useEffect(() => {
    loadJudgementData();
  }, []);

  if (judgementData === null) { return null; }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<HomeRoute />}
          index
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
