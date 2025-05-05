"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BannedWordsTableProps {
  searchQuery: string
}

// Mock data for banned words
const initialBannedWords = [
  { id: 1, word: "estafa", addedBy: "admin1", addedAt: "2025-05-01T10:30:00" },
  { id: 2, word: "fraude", addedBy: "admin2", addedAt: "2025-05-01T11:15:00" },
  { id: 3, word: "trampa", addedBy: "admin1", addedAt: "2025-05-02T12:00:00" },
  { id: 4, word: "robo", addedBy: "superadmin", addedAt: "2025-05-03T13:30:00" },
  { id: 5, word: "hack", addedBy: "admin2", addedAt: "2025-05-04T14:45:00" },
]

export function BannedWordsTable({ searchQuery }: BannedWordsTableProps) {
  const { toast } = useToast()
  const [bannedWords, setBannedWords] = useState(initialBannedWords)

  const deleteWord = (id: number) => {
    setBannedWords(bannedWords.filter((word) => word.id !== id))
    toast({
      title: "Palabra eliminada",
      description: "La palabra ha sido eliminada de la lista de palabras prohibidas",
    })
  }

  // Filter words based on search query
  const filteredWords = bannedWords.filter((word) => word.word.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Palabra</TableHead>
            <TableHead>Agregada por</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredWords.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                No hay palabras prohibidas que coincidan con la búsqueda
              </TableCell>
            </TableRow>
          ) : (
            filteredWords.map((word) => (
              <TableRow key={word.id}>
                <TableCell>#{word.id}</TableCell>
                <TableCell className="font-medium">{word.word}</TableCell>
                <TableCell>{word.addedBy}</TableCell>
                <TableCell>{new Date(word.addedAt).toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteWord(word.id)}
                    className="text-destructive"
                    title="Eliminar"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
