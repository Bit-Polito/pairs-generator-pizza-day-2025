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
} from '@chakra-ui/react'
import bitpolitoLogo from './assets/bitpolito-logo-dark.png'
import bitpolitoIcon from './assets/bitpolito-icon-loving-cows.svg'

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
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

  return (
    <Container maxW="container.xl" py={10} bg="#001CE0" minH="100vh">
      <VStack spacing={4}>
        <Heading color="#F9F9F9" size="3xl" fontWeight="bold">Pizza Day 2025</Heading>
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <Text color="#F9F9F9" fontSize="sm">Brought to you by</Text>
          <Box 
            as="img"
            src={bitpolitoLogo}
            alt="BitPolito Logo"
            h="24px"
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
            _placeholder={{ color: '#001CE0' }}
          />
          <Box display="flex" justifyContent="center" w="100%">
            <Button 
              onClick={generateTeams} 
              bg="#F9F9F9"
              color="#001CE0"
              _hover={{ bg: '#E6E6E6' }}
              px={6}
            >
              Genera squadre
            </Button>
          </Box>
        </Box>

        {teams.length > 0 && (
          <Box w="100%">
            <Heading size="md" mb={4} color="#F9F9F9">Squadre:</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {teams.map((team, index) => (
                <Card key={index} bg="#F9F9F9" border="1px solid #F9F9F9">
                  <CardBody>
                    <Text fontWeight="bold" mb={2} color="#001CE0">Squadra {index + 1}</Text>
                    {team.map((member, memberIndex) => (
                      <Text key={memberIndex} color="#001CE0">{member}</Text>
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