import { db } from "@/db"
import { notFound } from "next/navigation"
import DesignConfigurator from "./DesignConfigurator"

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams

  if (!id || typeof id !== "string") {
    return notFound()
  }

  // make db call
  const configuration = await db.configuration.findUnique({
    where: { id },
  })

  if (!configuration) {
    return notFound()
  }

  const { imgUrl, width, height } = configuration

  return (
    <DesignConfigurator
      configId={configuration.id}
      imageDimensions={{ width, height }}
      imgUrl={imgUrl}
    />
  )
  
}

export default page
