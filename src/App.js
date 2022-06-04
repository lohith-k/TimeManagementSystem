import {useEffect } from 'react'

import Router from './routes';
// theme

import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
// ----------------------------------------------------------------------





export default function App() {
  useEffect(() => {
    document.title = "CLOCKIFY"
  }, [])
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
