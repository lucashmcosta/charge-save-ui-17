import React, { useState, lazy, Suspense } from 'react';

const PaymentModal = lazy(() => import('@/components/PaymentModal').then(module => ({ default: module.PaymentModal })));
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleCharge = (amount: string) => {
    toast({
      title: "Cobrança processada",
      description: `Valor de R$ ${amount} processado com sucesso!`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Informações salvas",
      description: "As informações do cartão foram salvas com segurança.",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold">Teste do Modal CRM</h1>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90"
          size="lg"
        >
          Abrir Modal de Pagamento
        </Button>
      </div>

      {isModalOpen && (
        <Suspense fallback={<div>Carregando...</div>}>
          <PaymentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCharge={handleCharge}
            onSave={handleSave}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
