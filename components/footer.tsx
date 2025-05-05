export function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">EL GRAN TRUCO</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">Mejores jugadores 2024</a>
              </li>
              <li className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">Soporte y Ayuda</a>
              </li>
              <li className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">Truco Argentino para celular</a>
              </li>
              <li className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">Normas de la comunidad</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">REDES SOCIALES</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">Truco en Instagram</a>
              </li>
              <li className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">Truco en Facebook</a>
              </li>
              <li className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">Truco en X</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">JUGAR</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">Dominó Online</a>
              </li>
              <li className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">Generala Online</a>
              </li>
              <li className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">Cómo jugar al Truco Argentino</a>
              </li>
              <li className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">Reglamento de Truco Argentino</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Truco Club. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
