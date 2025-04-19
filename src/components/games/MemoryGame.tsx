
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Card {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

const MemoryGame = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);

  const icons = ['🌟', '🎈', '🎪', '🎭', '🎨', '🎯', '🎲', '🎮'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const duplicatedIcons = [...icons, ...icons];
    const shuffledCards = duplicatedIcons
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        flipped: false,
        matched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(id)) return;
    if (cards[id].matched) return;

    const newCards = cards.map(card =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);

    if (flippedCards.length === 1) {
      const [firstCard] = flippedCards;
      if (cards[firstCard].icon === cards[id].icon) {
        setCards(cards.map(card =>
          card.id === id || card.id === firstCard
            ? { ...card, matched: true, flipped: true }
            : card
        ));
        setMatches(m => m + 1);
        setFlippedCards([]);
        if (matches + 1 === icons.length) {
          toast({
            title: "Congratulations!",
            description: "You've completed the memory game!",
          });
        }
      } else {
        setTimeout(() => {
          setCards(cards.map(card =>
            card.id === id || card.id === firstCard
              ? { ...card, flipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-wellness-dark">Memory Challenge</h2>
        <Button onClick={initializeGame} className="bg-wellness-primary hover:bg-wellness-dark">
          New Game
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <Card 
            key={card.id}
            className={`h-24 flex items-center justify-center text-3xl cursor-pointer transition-all transform hover:scale-105
              ${card.flipped ? 'bg-wellness-light' : 'bg-wellness-primary'}`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.flipped ? card.icon : '?'}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
