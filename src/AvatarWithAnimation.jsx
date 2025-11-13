"use client";

import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, useFBX } from "@react-three/drei";
import * as THREE from "three";

export function AvatarWithAnimation({ scale = 0.5, position = [0, -0.3, 0] }) {
  const group = useRef();
  const [step, setStep] = useState("Jump"); // Jump → Hi → Idle
  const [scrolling, setScrolling] = useState(false);

  const { nodes, materials } = useGLTF("/models/68d6c1303f25300746893017.glb");

  const { animations: jumpingDown } = useFBX("/annimations/Jumping Down.fbx");
  const { animations: standingGreeting } = useFBX(
    "/annimations/Standing Greeting.fbx"
  );
  const { animations: idleAnim } = useFBX("/annimations/Petting Animal.fbx");
  const { animations: fallingIdle } = useFBX("/annimations/Petting Animal.fbx");

  jumpingDown[0].name = "Jumping";
  standingGreeting[0].name = "Hi";
  idleAnim[0].name = "Idle";
  fallingIdle[0].name = "FallingIdle";

  const { actions, mixer } = useAnimations(
    [jumpingDown[0], standingGreeting[0], idleAnim[0], fallingIdle[0]],
    group
  );

  const targetY = -0.3; // Idle Y position
  const jumpMaxY = 0.1; // Maximum height during jump
  const jumpDuration = 0.8; // approximate duration of jump

  // Scroll detection
  useEffect(() => {
    let timeout;
    const onScroll = () => {
      setScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setScrolling(false), 150);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Jump animation
  useEffect(() => {
    if (step !== "Jump" || !actions["Jumping"]) return;

    const jumpAction = actions["Jumping"];
    jumpAction.reset().setLoop(THREE.LoopOnce).play();
    jumpAction.clampWhenFinished = true;

    // Animate Y position
    const startTime = performance.now();
    const animateY = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      if (elapsed < jumpDuration) {
        const t = elapsed / jumpDuration;
        group.current.position.y = targetY + jumpMaxY * 4 * t * (1 - t);
        requestAnimationFrame(animateY);
      } else {
        group.current.position.y = targetY;
      }
    };
    animateY();

    // On jump finished → Hi
    const onJumpFinished = () => {
      jumpAction.getMixer().removeEventListener("finished", onJumpFinished);
      setStep("Hi");
    };
    jumpAction.getMixer().addEventListener("finished", onJumpFinished);
  }, [step, actions]);

  // Hi animation
  useEffect(() => {
    if (step !== "Hi" || !actions["Hi"]) return;

    const hiAction = actions["Hi"];
    const idleAction = actions["Idle"];

    hiAction.reset().setLoop(THREE.LoopOnce).fadeIn(0.3).play();
    hiAction.clampWhenFinished = true;

    // On Hi finished → Idle
    const onHiFinished = () => {
      hiAction.getMixer().removeEventListener("finished", onHiFinished);
      setStep("Idle");
      idleAction.reset().setLoop(THREE.LoopRepeat).fadeIn(0.5).play();
    };
    hiAction.getMixer().addEventListener("finished", onHiFinished);
  }, [step, actions]);

  // Scroll animations
  useEffect(() => {
    if (!actions["Idle"] || !actions["FallingIdle"]) return;

    if (scrolling) {
      actions["Idle"]?.fadeOut(0.2);
      actions["FallingIdle"]?.reset().fadeIn(0.2).play();
      actions["FallingIdle"].loop = THREE.LoopRepeat;
    } else {
      actions["FallingIdle"]?.fadeOut(0.2);
      actions["Idle"]?.reset().fadeIn(0.5).play();
      actions["Idle"].loop = THREE.LoopRepeat;
    }
  }, [scrolling, actions]);

  useFrame((state, delta) => {
    const head = group.current?.getObjectByName("Wolf3D_Head");
    head?.lookAt(state.camera.position);
    mixer.update(delta);
  });

  return (
    <group ref={group} scale={scale} position={position} dispose={null}>
      <group rotation-x={[-Math.PI / 2]}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/68d6c1303f25300746893017.glb");
