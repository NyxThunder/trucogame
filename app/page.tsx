import { HomeNavbar } from "@/components/home-navbar"
import { GameTables } from "@/components/game-tables"
import { WeeklyRanking } from "@/components/weekly-ranking"
import { Footer } from "@/components/footer"
import { LoginButton } from "@/components/login-button"
import { UserBalance } from "@/components/user-balance"
import { ModeToggle } from "@/components/mode-toggle"
import { Suspense } from "react"
import { TablesSkeleton } from "@/components/tables-skeleton"

export default function Home() {
  // This would normally be fetched from an API
  const isLoggedIn = true
  const currentRoom = "El Firulete"

  return (
    <main className="min-h-screen bg-gradient-to-b from-background/80 to-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5 bg-repeat z-0"></div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=128&q=80"
                alt="Truco Club Logo"
                className="h-16"
              />
            </div>
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <UserBalance />
                  <ModeToggle />
                </>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>

        <HomeNavbar currentRoom={currentRoom} />

        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Estás en {currentRoom}</h2>
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors">
              BUSCAR MESA
            </button>
          </div>

          <Suspense fallback={<TablesSkeleton />}>
            <GameTables />
          </Suspense>

          <div className="mt-8 bg-card rounded-lg p-4 shadow-lg border border-border">
            <WeeklyRanking />
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
