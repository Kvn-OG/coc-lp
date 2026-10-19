export const clinicConfig = {
  name: "Centro Odontológico Cariacica",
  instagram: "https://www.instagram.com/centroodontologicocariacica/",
  whatsappNumber: "5527995819584",
  address: "Avenida Expedito Garcia, 140",
  neighborhood: "Campo Grande",
  city: "Cariacica — ES",
  locationReferences: [
    "Em frente à Loja Claro.",
    "Ao lado do Supermercado BH.",
    "Próximo à Loja Avenida.",
    "Acima da Jaianny Fashion.",
  ],
  openingHours: "",
  mapUrl: "",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.962001570847!2d-40.387919324762045!3d-20.343188381140184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb83fd0b6f20aa7%3A0x6901ba2a50813dc4!2sCentro%20Odontol%C3%B3gico%20Cariacica!5e0!3m2!1spt-BR!2sbr!4v1792385312393!5m2!1spt-BR!2sbr",
};

export const clinicImages = {
  hero: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85",
  about:
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=85",
  treatments: [
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80",
  ],
  editorial: [
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
  ],
};

export function getWhatsAppUrl(message = "Olá! Gostaria de saber mais sobre o atendimento.") {
  const number = clinicConfig.whatsappNumber.replace(/\D/g, "");
  if (!/^\d{10,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getMapsUrl() {
  if (clinicConfig.mapUrl) return clinicConfig.mapUrl;
  if (!clinicConfig.address || !clinicConfig.neighborhood || !clinicConfig.city) return null;

  const destination = [
    clinicConfig.name,
    clinicConfig.address,
    clinicConfig.neighborhood,
    clinicConfig.city,
  ].join(", ");
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

export function trackConversion(action) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("clinic:conversion", { detail: { action } }));
  }
}
