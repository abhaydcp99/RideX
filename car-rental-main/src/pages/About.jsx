// About.jsx
import React from "react";
import {
  Card,
  Avatar,
  CardContent,
  Typography,
  Stack,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

const particlesInit = async (main) => {
  await loadFull(main);
};

const About = () => {
  return (
    <Box sx={{ position: "relative", backgroundColor: "#fff" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "#ffffff" },
          fpsLimit: 60,
          particles: {
            color: { value: "#1976d2" },
            links: { enable: true, color: "#1976d2", distance: 150 },
            move: { enable: true, speed: 1 },
            number: { value: 60 },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100 } },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      <ParallaxProvider>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Box sx={{ pt: 12, pb: 8, position: "relative", zIndex: 1 }}>
            <Container>
              <Parallax speed={-5}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 3,
                    color: "#0f172a",
                    textAlign: "center",
                  }}
                >
                  About RideX
                </Typography>
              </Parallax>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: "900px",
                  mx: "auto",
                  mb: 6,
                  color: "#334155",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                At RideX, our mission is to revolutionize urban mobility by
                providing a seamless, eco-friendly, and affordable ride-sharing
                experience. Rooted in innovation and customer-centricity, we
                connect drivers and riders to create safer and smarter journeys.
              </Typography>

              <Parallax speed={-3}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 4,
                    color: "#0f172a",
                    textAlign: "center",
                  }}
                >
                  Meet Our Team
                </Typography>
              </Parallax>

              <Stack
                direction="row"
                spacing={5}
                justifyContent="center"
                flexWrap="wrap"
              >
                {[
                  {
                    name: "Abhay Chavan",
                    role: "Frontend Developer",
                    img: "public/images/abhay1.jpeg",
                    linkedin: "https://www.linkedin.com/in/abhay-dcp-/",
                    github: "https://github.com/abhaydcp99",
                  },
                  {
                    name: "Kritika Patil",
                    role: "Backend Developer",
                    img: "public/images/Kritika.jpg",
                    linkedin:
                      "https://www.linkedin.com/in/krutika-patil-669659262",
                    github: "https://github.com/KRUTIIIII",
                  },
                  {
                    name: "Arprit Sharma",
                    role: "Backend Developer",
                    img: "public/images/arprit.jpg",
                    linkedin:
                      "https://www.linkedin.com/in/arpit-sharma-1a0861111?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                    github: "https://github.com/arpit180/",
                  },
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.07 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card
                      sx={{
                        width: 260,
                        borderRadius: "20px",
                        boxShadow: 6,
                        textAlign: "center",
                        padding: 3,
                        backgroundColor: "#f1f5f9",
                        color: "#1e293b",
                      }}
                    >
                      <Avatar
                        alt={member.name}
                        src={member.img}
                        sx={{
                          width: 120,
                          height: 120,
                          margin: "0 auto",
                          border: "4px solid #38bdf8",
                          boxShadow: 4,
                        }}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ mt: 2 }}
                        >
                          {member.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#475569" }}>
                          {member.role}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent="center"
                          mt={1}
                        >
                          <IconButton
                            component="a"
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: "#0ea5e9" }}
                          >
                            <LinkedInIcon />
                          </IconButton>
                          <IconButton
                            component="a"
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: "#1e293b" }}
                          >
                            <GitHubIcon />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Stack>
            </Container>
          </Box>
        </motion.div>
      </ParallaxProvider>
    </Box>
  );
};

export default About;
