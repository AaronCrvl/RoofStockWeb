import './index.css';  // Assuming you have a global CSS file for custom styles (if needed)
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppProvider from './providers/AppProvider';  // Ajuste o caminho conforme necessário
import RouteConfig from './routes/Route';  // Ajuste o caminho conforme necessário
import Layout from './layout/Layout';  // Ajuste o caminho conforme necessário

 export default function App() {
   return (
     <AppProvider>      
         <Layout>
           <RouteConfig />
         </Layout>      
     </AppProvider>
   );
 }

import React from 'react';
