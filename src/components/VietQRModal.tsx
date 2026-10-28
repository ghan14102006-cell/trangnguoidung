import React, { useState } from 'react';
import { X, Copy, Check, QrCode, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Order } from '../types';
import { formatVND } from '../data/products';

interface VietQRModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onPaymentConfirmed: (order: Order) => void;
  onToast: (msg: string) => void;
}

export const VietQRModal: React.FC<VietQRModalProps> = ({
  order,
  isOpen,
  onClose,
  onPaymentConfirmed,
  onToast,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen || !order) return null;

  const copyToClipboard = (text: string, field: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    onToast(`Đã sao chép ${label}: ${text}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const qrUrl = `https://img.vietqr.io/image/MB-090123456789-compact2.png?amount=${order.payAmount}&addInfo=${order.orderId}&accountName=BLOSSOM%20GARDEN`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4 text-center relative shadow-2xl animate-scaleUp">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#57886c] text-xs font-bold">
            <QrCode className="w-3.5 h-3.5" />
            <span>VietQR Chuẩn Napas 24/7</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-gray-900">
            Quét Mã VietQR Chuyển Khoản
          </h3>
          <p className="text-xs text-gray-500">
            Mở app ngân hàng bất kỳ để quét mã hoặc chuyển theo thông tin dưới
          </p>
        </div>

        {/* QR Code Graphic Frame */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-pink-100 inline-block shadow-inner">
          <img
            src={qrUrl}
            alt="Mã VietQR Blossom Garden"
            className="w-52 h-52 mx-auto rounded-xl object-contain shadow-2xs"
          />
          <div className="text-[10px] text-gray-400 mt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Tự động điền số tiền & nội dung đơn</span>
          </div>
        </div>

        {/* Payment Transfer Details */}
        <div className="text-xs text-left bg-[#fff0f3]/70 p-4 rounded-2xl space-y-2 border border-pink-100">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Ngân hàng:</span>
            <span className="font-bold text-gray-900">MB Bank (Quân Đội)</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Chủ tài khoản:</span>
            <span className="font-bold text-gray-900">BLOSSOM GARDEN</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Số tài khoản:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold font-mono text-gray-900">0901 234 56789</span>
              <button
                onClick={() => copyToClipboard('090123456789', 'acc', 'số tài khoản')}
                className="text-gray-400 hover:text-[#e8929e] p-0.5"
                title="Sao chép STK"
              >
                {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-pink-200/50 pt-2">
            <span className="text-gray-700 font-medium">Số tiền {order.paymentMode === 'deposit' ? 'đặt cọc (50%)' : 'toàn bộ (100%)'}:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#e8929e] font-serif text-sm tabular-nums">
                {formatVND(order.payAmount)}
              </span>
              <button
                onClick={() => copyToClipboard(order.payAmount.toString(), 'amt', 'số tiền')}
                className="text-gray-400 hover:text-[#e8929e] p-0.5"
                title="Sao chép số tiền"
              >
                {copiedField === 'amt' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Nội dung chuyển khoản:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold font-mono text-gray-900 bg-white px-2 py-0.5 rounded border border-pink-200">
                {order.orderId}
              </span>
              <button
                onClick={() => copyToClipboard(order.orderId, 'memo', 'nội dung')}
                className="text-gray-400 hover:text-[#e8929e] p-0.5"
                title="Sao chép nội dung"
              >
                {copiedField === 'memo' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Action Button */}
        <button
          onClick={() => onPaymentConfirmed(order)}
          className="w-full py-3.5 bg-[#57886c] hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Tôi Đã Chuyển Khoản Thành Công</span>
        </button>

        <p className="text-[11px] text-gray-400">
          Hệ thống sẽ tự động đối soát trong 30 giây và chuyển sang màn hình theo dõi đơn hàng.
        </p>
      </div>
    </div>
  );
};
