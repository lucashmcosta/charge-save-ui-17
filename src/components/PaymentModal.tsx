import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Save, DollarSign } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCharge?: (amount: string) => void;
  onSave?: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onCharge,
  onSave,
}) => {
  const [selectedAction, setSelectedAction] = useState<'charge' | 'save' | null>(null);
  const [amount, setAmount] = useState('');

  const handleReset = () => {
    setSelectedAction(null);
    setAmount('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleChargeClick = () => {
    setSelectedAction('charge');
  };

  const handleSaveClick = () => {
    setSelectedAction('save');
    onSave?.();
  };

  const handleFinalize = () => {
    if (amount && onCharge) {
      onCharge(amount);
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <CreditCard className="h-5 w-5 text-primary" />
            Processamento de Pagamento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              Você gostaria de fazer uma cobrança ou salvar as informações do cartão do cliente?
            </p>
          </div>

          {!selectedAction && (
            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleChargeClick}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                size="lg"
              >
                <DollarSign className="h-4 w-4" />
                Cobrar
              </Button>
              <Button
                onClick={handleSaveClick}
                variant="outline"
                className="flex items-center gap-2 border-success text-success hover:bg-success hover:text-success-foreground"
                size="lg"
              >
                <Save className="h-4 w-4" />
                Salvar
              </Button>
            </div>
          )}

          {selectedAction === 'charge' && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
              <div className="p-4 bg-muted/50 rounded-lg border border-primary/20">
                <Label htmlFor="amount" className="text-sm font-medium">
                  Digite o valor
                </Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    R$
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 text-lg font-medium"
                    autoFocus
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleFinalize}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                >
                  Finalizar
                </Button>
              </div>
            </div>
          )}

          {selectedAction === 'save' && (
            <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-center gap-2 text-success">
                <Save className="h-5 w-5" />
                <span className="font-medium">Informações salvas com sucesso!</span>
              </div>
            </div>
          )}
        </div>

        {selectedAction !== 'charge' && (
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Fechar
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};