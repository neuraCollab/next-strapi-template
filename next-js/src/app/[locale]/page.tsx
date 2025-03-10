import { ExampleClientComponent } from "./ExampleClientComponent"
import { AmbientColor } from "@/components/decorations/ambient-color"

export default function Home() {
  // await getServerSession(authOptions);

  return (
    <div>
      <ExampleClientComponent />
      <AmbientColor />
    </div>
  )
}
