import React, { useState } from "react";

interface ClickedProps {
  clientX: number,
  clientY: number
}

export default function Home() {

  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([])
  const [oldClicked, setOldClicked] = useState<ClickedProps[]>([])

  function getCordenates(e: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY } = e
    setClickedPoints([...clickedPoints, { clientX, clientY }])
    console.log(clickedPoints)
    console.log(oldClicked)
    console.log(getCordenates)
  }

  function handleDesfazer() {
    const newClickedPoints = [...clickedPoints]
    const refazer = newClickedPoints.pop()
    if (!refazer) return
    setClickedPoints(newClickedPoints)
    setOldClicked([...oldClicked, refazer])
  }

  function handleRefazer() {
    const newOldClicked = [...oldClicked]
    const refazerPoints = newOldClicked.pop()
    setOldClicked(newOldClicked)
    if (!refazerPoints) return
    setClickedPoints([...clickedPoints, refazerPoints])
  }

  return (
    <>
      <button disabled={clickedPoints.length === 0} onClick={handleDesfazer}>Desfazer</button>
      <button disabled={oldClicked.length === 0} onClick={handleRefazer}>Refazer</button>
      <div className="Home" onClick={getCordenates}>
        {clickedPoints.map((clickedPoint, index) => {
          return <div key={index}
            style={{
              left: clickedPoint.clientX - 6,
              top: clickedPoint.clientY - 6,
              position: 'absolute',
              borderRadius: '50%',
              background: 'red',
              width: '12px',
              height: '12px'
            }}></div>
        })}
      </div >
    </>
  )
}