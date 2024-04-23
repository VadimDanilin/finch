async function sendTicket(firstField: number[], secondField: number[], isTicketWon: boolean) {
  let countQueries = 0

  const sendQuery = async () => {
    countQueries++
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        selectedNumber:
          { firstField,
            secondField
          },
        isTicketWon
      })
    })

    if (response.status !== 200 && countQueries <= 3) {
      console.log(response.status)
      setTimeout(() => {
        sendQuery()
      }, 2000)
    }
  }

  sendQuery()
}

export default sendTicket