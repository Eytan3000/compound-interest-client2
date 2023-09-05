// const url = 'http://localhost:8090/';
const url = 'https://compound-interest-calc-a22aeeb9e026.herokuapp.com/';

export async function postDataToDb(
  principal:number,
  monthlyContribution:number,
  yearsToGrow:number,
  yearlyInterestRate:number,
  fv:number, totalDeposit:number, totalInterest:number
) {
  const postData = {
    principal,
    monthlyContribution,
    yearsToGrow,
    yearlyInterestRate,
    fv, totalDeposit, totalInterest
  };
  try {
    const response = await fetch(url+ 'logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error:', err);
  }
}

export async function get10RecentFv() {
  try {
    const response = await fetch(url + '10LastFv', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error:', err);
  }
}

export async function getLog(id:number) {
  try {
    const response = await fetch(url + 'logs/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error:', err);
  }
}
