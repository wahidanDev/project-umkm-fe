import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // 👈 ambil user
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { useNavigate } from "react-router-dom"; // 👈 pakai ini

export function CartButton() {
  const { cart, removeFromCart } = useCart();
  const { user } = useAuth(); // 👈 cek user login
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate(); // 👈 react-router-dom

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    // jika user sudah login → redirect ke halaman success
    navigate("/checkout-success");
  };

  // Hitung total pembayaran
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Floating button di pojok kanan atas */}
      <button
        onClick={onOpen}
        className="fixed top-30 right-100 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition animate-bounce"
      >
        <ShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1">
            {cart.length}
          </span>
        )}
      </button>

      {/* Modal rincian cart */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Keranjang Belanja
              </ModalHeader>

              <ModalBody>
                {cart.length === 0 ? (
                  <p className="text-gray-600">Keranjang masih kosong</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          removeFromCart(item._id);
                          if (cart.length === 1) onClose();
                        }}
                        className="text-red-500 text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  ))
                )}
              </ModalBody>

              {/* Tambah Footer dengan total + tombol Checkout */}
              {cart.length > 0 && (
                <ModalFooter className="flex flex-col gap-2">
                  <div className="flex justify-between w-full text-lg font-semibold">
                    <span>Total:</span>
                    <span>Rp {total.toLocaleString("id-ID")}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
                  >
                    Checkout
                  </button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
