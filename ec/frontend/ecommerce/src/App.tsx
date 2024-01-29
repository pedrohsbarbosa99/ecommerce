import axios from 'axios';
// import useApiRequest from './hooks/UseApiRequest'
import { Payment, initMercadoPago, StatusScreen } from '@mercadopago/sdk-react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


initMercadoPago('TEST-19e5ad1a-db4c-470e-8d80-f80bc7cfede8', { locale: 'pt-BR' });


const App = () => {
  const [transactionId, setTransactionId] = useState(1320902855);
  const customization = {
    visual: {
      style: {
        theme: "flat",
      },
    },
    paymentMethods: {
      // atm: 'all',
      // ticket: 'all',
      bankTransfer: ['pix'],
      creditCard: 'all',
      // debitCard: 'all',
      // mercadoPago: 'all',
    },
  };

  
  const initialization = {
    amount: 101,
    // preferenceId: '207446753-ea3adb2e-a4f2-41dd-a656-11cb01b8772c',
  };

  const ini = {
    paymentId: transactionId
  }
  return (
    <>
    <Grid container spacing={2}>
    <Grid item xs={6} md={2}>
    <StatusScreen
      initialization={ini}
      customization={{ visual: { hideStatusDetails: true, hideTransactionDate: true } }}
    />
    </Grid>
    <Grid item xs={6} md={6}>
      <Item>xs=6 md=8</Item>
    </Grid>
    <Grid item xs={6} md={4}>
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={async (param) => {        
        try {
          const response = await axios.post(
            'http://localhost:8000/api/payments/process',
            param.formData
          );
          const { paymentId } = response.data.id; // Substitua "paymentId" pelo nome correto no seu backend
          setTransactionId(paymentId);
        } catch (error) {
          console.error('Erro ao processar pagamento:', error);
          // Lógica de tratamento de erro
        }
      }}
    />
    </Grid>    
  </Grid>

    </>
  );
};
export default App;