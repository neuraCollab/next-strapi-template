"use client"

import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"

import CardElement from "@/components/ui/Card"
import Header from "@/components/ui/header"
import { useState } from "react"
import useSWR from "swr"
import axios from "axios"
import { fetcher } from "@/lib/api"
import HouseCalculator from "@/components/ui/HouseCalculator"
import FranchiseCards from "@/components/ui/FranchiseCard"
import SEOContentBlock from "@/components/ui/TextMainPage"
import { Button } from "../../components/elements/button"
import StrapiCard from "@/components/ui/SmallCard"

export function ExampleClientComponent() {
  const { data: session, status } = useSession()

  const { data, error } = useSWR("/team-members", fetcher)
  const cards = new Array(1).fill(null) // Создаем массив из 13 элементов

  if (status === "loading") {
    return <p>Hang on there...</p>
  }

  if (error) return <div>Ошибка загрузки</div>
  if (!data) return <div>Загрузка...</div>

  if (status === "unauthenticated") {
    return (
      <>
        {/* {data.data.map((doc: any) => (
          <div key={doc.id}>
            <h2>{doc.name}</h2>
            <p>{doc.description}</p>
            <small>Slug: {doc.slug}</small>
          </div>
        ))} */}
        <Header />


        <div className="flex flex-wrap justify-center gap-4 mt-[50px] z-10 relative">
          {cards.map((_, index) => (
            <div
              key={index}
            // className={`transform transition-all ${index < 3 ? 'z-20 translate-y-[-20px]' : ''}`} // Первые 3 карточки немного наслаиваются
            >
              <StrapiCard id={index} />
            </div>
          ))}
        </div>

        <SEOContentBlock />
        <FranchiseCards />
        <HouseCalculator />

        {/* Контейнер для карточек */}
        <div className="flex flex-wrap justify-center gap-4 mt-[50px] z-10 relative">
          {cards.map((_, index) => (
            <div
              key={index}
            // className={`transform transition-all ${index < 3 ? 'z-20 translate-y-[-20px]' : ''}`} // Первые 3 карточки немного наслаиваются
            >
              <CardElement />
            </div>
          ))}
        </div>
        {/* <p>Not signed in.</p>
        <Button onClick={() => signIn("github")}>Sign in with GitHub</Button> */}
      </>
    )
  }

  return (
    <div>
      ClientComponent {status}{" "}
      {status === "authenticated" && (
        <>
          {session?.user?.image && <Image src={session.user.image} alt="Avatar" width={100} height={100} priority />}

          <div>{session.user?.name}</div>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )}
    </div>
  )
}
