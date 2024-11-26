import { Box, Container } from '@mui/material'

export const MainContent = ({ children }: React.PropsWithChildren) => (
  <Box
    component="main"
    sx={{
      background: (theme) =>
        `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
    }}
  >
    <Container maxWidth={false} sx={{ minHeight: '100vh', py: 4 }}>
      {children}
    </Container>
  </Box>
)
