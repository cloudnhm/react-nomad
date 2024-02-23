import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #c84e89, #F15F79);
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 40px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const hoverEffects: { [key: string]: { originX: number; originY: number } } = {
  "1": { originX: 1, originY: 1 },
  "2": { originX: 0, originY: 1 },
  "3": { originX: 1, originY: 0 },
  "4": { originX: 0, originY: 0 },
};

const ToggleButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: #eee;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 12px;
`;

const ToggleIndicator = styled(motion.div)`
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
`;

const CircleChild = styled(motion.div)`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: #fff;
`

const toggleVariants = {
  on: { x: 25 },
  off: { x: -25 },
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [toggle, setToggle] = useState(false);

  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box onClick={() => setId(n)} key={n} layoutId={n} whileHover={{ scale: 1.1, ...hoverEffects[n],  }}>
            {toggle && n === "2" && <CircleChild />}
            {!toggle && n === "3" && <CircleChild />}
          </Box>
        ))}
      </Grid>
      <ToggleButton onClick={() => setToggle(!toggle)}>
        {toggle ? "ON" : "OFF"}
        <ToggleIndicator
          variants={toggleVariants}
          animate={toggle ? "on" : "off"}
        />
      </ToggleButton>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box layoutId={id} style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
