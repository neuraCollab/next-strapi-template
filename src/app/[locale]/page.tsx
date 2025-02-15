import { ThemeToggle } from "@/components/ThemeToggle"
import { ExampleClientComponent } from "./ExampleClientComponent"
import { AmbientColor } from "@/components/decorations/ambient-color"

export default function Home() {
  // await getServerSession(authOptions);

  return (
    <div>
      {/* <p className="text-3xl font-bold underline">Hello Tailwind!</p> */}
      <ExampleClientComponent />
      <AmbientColor />
      <ThemeToggle />
    </div>
  )
}
