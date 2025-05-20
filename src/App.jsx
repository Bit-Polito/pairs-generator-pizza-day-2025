import { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Textarea,
  Button,
  Text,
  useToast,
  Card,
  CardBody,
  SimpleGrid,
  HStack,
} from '@chakra-ui/react'
import bitpolitoLogo from './assets/bitpolito-logo-dark.png'
import bitpolitoIcon from './assets/bitpolito-icon-loving-cows.svg'
import bitpolitoHeart from './assets/bitpolito-icon-heart.png'
import downloadIcon from './assets/icon-download.png'
import * as XLSX from 'xlsx'
import './styles/fonts.css'

// Fisher-Yates shuffle algorithm with cryptographically secure random numbers
function shuffleArray(array) {
  const shuffled = [...array]
  const randomValues = new Uint32Array(shuffled.length)
  crypto.getRandomValues(randomValues)
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = randomValues[i] % (i + 1)
    // Swap elements using a temporary variable
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }
  return shuffled
}

function App() {
  const [names, setNames] = useState('')
  const [teams, setTeams] = useState([])
  const [teamSize, setTeamSize] = useState(2)
  const toast = useToast()

  const generateTeams = () => {
    const nameList = names
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0)

    if (nameList.length < teamSize) {
      toast({
        title: 'Errore',
        description: `Sono necessari almeno ${teamSize} nomi per formare le squadre`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // Usa l'algoritmo Fisher-Yates per mescolare i nomi
    const shuffled = shuffleArray(nameList)
    const newTeams = []

    // Create teams
    for (let i = 0; i < shuffled.length; i += teamSize) {
      newTeams.push(shuffled.slice(i, i + teamSize))
    }

    setTeams(newTeams)
  }

  const downloadExcel = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new()
    
    // Convert teams array to worksheet format
    const wsData = teams.map((team, index) => ({
      'Squadra': `Squadra ${index + 1}`,
      'Membri': team.join(', ')
    }))
    
    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(wsData)
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Squadre')
    
    // Generate Excel file
    XLSX.writeFile(wb, 'squadre_pizza_day_2025.xlsx')
  }

  return (
    <Container maxW="container.xl" py={10} bg="#001CE0" minH="100vh">
      <VStack spacing={4}>
        <Heading color="#F9F9F9" size="3xl" fontWeight="bold">Pizza Day 2025!</Heading>
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <Text color="#F9F9F9" fontSize="sm">Made with</Text>
          <Box 
            as="img"
            src={bitpolitoHeart}
            alt="BitPolito Heart"
            h="14px"
            objectFit="contain"
          />
          <Text color="#F9F9F9" fontSize="sm">by</Text>
          <Box 
            as="img"
            src={bitpolitoLogo}
            alt="BitPolito Logo"
            h="18px"
            objectFit="contain"
          />
        </Box>

        <Box display="flex" justifyContent="center" w="100%" mb={6}>
          <Box 
            as="img"
            src={bitpolitoIcon}
            alt="BitPolito Icon"
            h="120px"
            objectFit="contain"
            className="rotating-icon"
          />
        </Box>
        
        <Box w="100%" maxW="600px">
          <Textarea
            value={names}
            onChange={(e) => setNames(e.target.value)}
            placeholder="Inserisci i nomi qui (uno per riga)..."
            rows={6}
            mb={4}
            color="#001CE0"
            bg="#F9F9F9"
            borderColor="#F9F9F9"
            borderWidth="1px"
            borderRadius="xl"
            _placeholder={{ color: '#001CE0' }}
          />
          <Box display="flex" justifyContent="center" w="100%">
            <Button 
              onClick={generateTeams} 
              bg="#001CE0"
              color="#F9F9F9"
              _hover={{ bg: '#0025FF' }}
              px={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="#F9F9F9"
            >
              Genera squadre
            </Button>
          </Box>
        </Box>

        {teams.length > 0 && (
          <Box w="100%">
            <HStack mb={4} spacing={2}>
              <Heading size="md" color="#F9F9F9">Squadre:</Heading>
              <Box
                as="a"
                onClick={downloadExcel}
                cursor="pointer"
                color="#F9F9F9"
                _hover={{ opacity: 0.8 }}
                aria-label="Scarica Excel"
              >
                <Box
                  as="img"
                  src={downloadIcon}
                  alt="Download"
                  h="20px"
                  objectFit="contain"
                />
              </Box>
            </HStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {teams.map((team, index) => (
                <Card key={index} bg="#F9F9F9" border="1px solid #F9F9F9" borderRadius="xl">
                  <CardBody>
                    <Text fontWeight="bold" mb={2} color="#001CE0">Squadra {index + 1}</Text>
                    {team.map((member, memberIndex) => (
                      <Text key={memberIndex} color="#001CE0" fontWeight="normal">{member}</Text>
                    ))}
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </VStack>
    </Container>
  )
}

export default App 