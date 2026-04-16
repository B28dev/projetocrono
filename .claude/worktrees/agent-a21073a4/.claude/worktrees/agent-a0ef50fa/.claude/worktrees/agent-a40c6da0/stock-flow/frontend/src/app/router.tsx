import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppShell } from './layout/AppShell'
import { CadastroScreen } from '../screens/CadastroScreen'
import { DashboardScreen } from '../screens/DashboardScreen'
import { EstoqueScreen } from '../screens/EstoqueScreen'
import { HistoricoScreen } from '../screens/HistoricoScreen'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/estoque" replace />,
      },
      {
        path: 'estoque',
        element: <EstoqueScreen />,
      },
      {
        path: 'cadastrar',
        element: <CadastroScreen />,
      },
      {
        path: 'historico',
        element: <HistoricoScreen />,
      },
      {
        path: 'dashboard',
        element: <DashboardScreen />,
      },
    ],
  },
])
