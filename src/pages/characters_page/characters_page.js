import React, { useEffect, useState } from 'react'
import { useCharactersStore } from '../../hooks/stores'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const CharacterCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
`

const RedBox = styled.div`
  width: 500px;
  height: 500px;
  background: red;
`

const CharacterPicture = styled.img`
  border-radius: 50%;
`

const CharactersPage = () => {
  const {
    fetch,
    reset,
    charactersList,
    loadingState: { isLoaded },
  } = useCharactersStore()

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    console.log('fetch')
    fetch()

    return () => {
      console.log('reset')
      reset()
    }
  }, [fetch, reset, isVisible])

  const onClick = () => {
    setIsVisible(!isVisible)
  }

  if (!isLoaded) return <RedBox />

  return (
    <>
      <h1>Characters Page</h1>
      <button onClick={onClick}>{isVisible ? 'Visible' : 'Invisible'}</button>
      {charactersList.map((character) => (
        <CharacterCard key={character.id}>
          <p>{character.name}</p>
          <CharacterPicture src={character.image} />
        </CharacterCard>
      ))}
    </>
  )
}

export default observer(CharactersPage)
