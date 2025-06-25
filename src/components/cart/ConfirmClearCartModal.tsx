// src/components/cart/ConfirmClearCartModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/ui/Button";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmClearCartModal({
  open,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent
        aria-describedby="confirma se o usuário quer esvaziar o carrinho"
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Itens de outra loja no carrinho</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-500">
          Você já tem produtos no carrinho de outra loja. Deseja esvaziar o
          carrinho para adicionar produtos desta loja?
        </div>
        <DialogFooter>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button onClick={onConfirm}>Esvaziar carrinho e continuar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
