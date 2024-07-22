import { AppServerComponent } from './AppServerComponent'
import App from './AppClientComponent'

export default async function AppWrapper() {
  const serverData = await AppServerComponent()

  return <App serverData={serverData} />
}