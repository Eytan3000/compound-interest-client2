import { useEffect, useState } from 'react';
import { Card, Typography } from '@mui/joy';
import { get10RecentFv, getLog } from '../../utils/database';
import { useDispatch, useSelector } from 'react-redux';
import { appActions, formActions, resultCardActions, sumsValuesActions } from '../../store';
import { calculateFutureValue, formatSums } from '../../utils/helpers';
//---------------------------------------------------
type LogsArrObject = {
  fv: number;
  id: number;
};

interface Props {
  dataPosted: boolean;
  isMobile: boolean;
}

interface RootState {
  resultCard:{
    id:number;
  }
}
//---------------------------------------------------
export default function SavedResultCard({ dataPosted, isMobile }: Props) {
  const [logsArr, setLogsArray] = useState<LogsArrObject[]>([]);
  
  const idState = useSelector((state:RootState)=>state.resultCard.id);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await get10RecentFv();
      setLogsArray(data);
    };
    fetchData();
  }, [dataPosted]);

  // async function handleCardClick(e: React.ChangeEvent<HTMLInputElement>) {
  //   const id = +e.currentTarget.id;


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleCardClick(e: any) {
    const id = e.target.id;

    //fetching from database
    const log = await getLog(id);

    // dispatcing states to see them in the form values
    dispatch(formActions.setReduxPrincipal(log.principal));
    dispatch(formActions.setReduxMonthlyContribution(log.monthlyContribution));
    dispatch(formActions.setReduxYears(log.yearsToGrow));
    dispatch(formActions.setReduxInterestRate(log.yearlyInterestRate));
    
    //destructuring returning elements from function that calculates the compound
    const { futureValue, totalInterest, futureValueArray } =
      calculateFutureValue(
        log.principal,
        log.monthlyContribution,
        log.yearsToGrow,
        log.yearlyInterestRate
      );
   
      // formating to string
    const formattedFutureValue = formatSums(futureValue);
    const formattedTotalInterest = formatSums(totalInterest);
    
    // dispatching to see sums in sumsCard
    dispatch(sumsValuesActions.setReduxfutureValue(formattedFutureValue));
    dispatch(sumsValuesActions.setReduxtotalInterest(formattedTotalInterest));
    dispatch(sumsValuesActions.setReduxfutureValueArray(futureValueArray));

    //set submited to true (to see the card)
    dispatch(appActions.setReduxSubmit(true));

    // setId(log.id);
    dispatch(resultCardActions.setId(log.id));
  }

  return (
    <Card
      sx={{
        marginLeft: '20px',
        maxHeight: '400px',
        width: '200px',
        overflowY: 'auto',
        flexDirection: 'column',
        margin: isMobile ? '0 auto' :null,
        marginTop:isMobile ? 10 : null

      }}
      size="lg"
      variant="outlined">
      <Typography textAlign={'center'} sx={{ textDecoration: 'underline' }}>
        Recent results
      </Typography>
      {/* <div style={{ maxHeight: '100%', overflow: 'hidden', }}> */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {logsArr.reverse().map((item, index) => {
          return (
            <Card
              id={item.id.toLocaleString()}
              onClick={(e) => handleCardClick(e)}
              key={index}
              variant="outlined"
              sx={{ marginY: 2, textAlign: 'center', cursor: 'pointer', background: item.id===idState ? '#e3effbff' : null }}
              >
              {' '}
              ${item.fv.toLocaleString()}
            </Card>
          );
        })}
      </div>
    </Card>
  );
}



