"use client";

import { useState, useEffect } from "react";
import Container from "../Container";
import SectionHeading from "../SectionHeading";
import Button from "../Button";
import CaseStudyCard from "../work/CaseStudyCard";
import { StaggerContainer, StaggerItem } from "../animations/Stagger";

export default function FeaturedWork() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWork() {
      try {
        const res = await fetch("http://localhost:4000/api/content/case-studies");
        if (res.ok) {
          const data = await res.json();
          setFeatured(data.filter((s) => s.featured).slice(0, 2));
        }
      } catch (error) {
        console.error("Failed to fetch case studies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWork();
  }, []);

  return (
    <section className="bg-brand-dark">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Work"
            title="Featured case studies"
            description="A snapshot of outcomes: conversion lift, reliability improvements, and faster delivery."
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <Button as="link" href="/work" variant="secondary">
              View Work
            </Button>
            <Button as="link" href="/contact" variant="brand">
              Book a Call
            </Button>
          </div>
        </div>

        <StaggerContainer className="mt-10 grid gap-6 lg:grid-cols-2">
          {featured.map((study) => (
            <StaggerItem key={study._id || study.id}>
              <CaseStudyCard study={study} />
            </StaggerItem>
          ))}
          {featured.length === 0 && !loading && (
            <p className="text-gray-400">No featured work found.</p>
          )}
        </StaggerContainer>
      </Container>
    </section>
  );
}
