/**
 * مؤسسة الدفاع للاستشارات وتأسيس الشركات وتراخيص المصانع
 * Main Client Scripts: VIP Interactions & Direct WhatsApp Connect
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_PHONE = '201006264498'; // 01006264498 formatted for WhatsApp
  
  // 1. Header Scroll Shadow
  const mainHeader = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close when clicking nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 3. Service Option Cards in Quote Generator
  const serviceCards = document.querySelectorAll('.service-option-card');
  let selectedService = 'تأسيس شركات';

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedService = card.getAttribute('data-service') || 'تأسيس شركات';
    });
  });

  // 4. Interactive Quote Form to Direct WhatsApp
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName')?.value.trim() || 'غير محدد';
      const phone = document.getElementById('clientPhone')?.value.trim() || 'غير محدد';
      const notes = document.getElementById('clientNotes')?.value.trim() || 'لا توجد ملاحظات إضافية';

      const message = `السلام عليكم مؤسسة الدفاع،
أود طلب استشارة تنفيذية عاجلة:
👤 الاسم / الكيان: ${name}
📱 الهاتف: ${phone}
🏢 الخدمة المطلوبة: ${selectedService}
📝 تفاصيل المشروع: ${notes}

يرجى التواصل لترتيب الخطوات وحجز الموعد.`;

      const encodedMessage = encodeURIComponent(message);
      const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
      window.open(waUrl, '_blank');
    });
  }

  // 5. VIP Modal Functionality
  const vipModal = document.getElementById('vipModal');
  const openModalBtns = document.querySelectorAll('.open-vip-modal');
  const closeModalBtns = document.querySelectorAll('.close-vip-modal');

  const openModal = () => {
    if (vipModal) {
      vipModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (vipModal) {
      vipModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

  if (vipModal) {
    vipModal.addEventListener('click', (e) => {
      if (e.target === vipModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && vipModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 6. VIP Modal Form Submit
  const modalForm = document.getElementById('modalForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('modalName')?.value.trim() || 'غير محدد';
      const phone = document.getElementById('modalPhone')?.value.trim() || 'غير محدد';
      const service = document.getElementById('modalService')?.value || 'استشارة عامة';
      const details = document.getElementById('modalDetails')?.value.trim() || 'طلب حجز موعد عاجل';

      const message = `طلب حجز موعد استشاري VIP - مؤسسة الدفاع:
👤 الاسم: ${name}
📞 رقم الهاتف: ${phone}
🏛 نوع الخدمة: ${service}
📌 تفاصيل: ${details}`;

      const encoded = encodeURIComponent(message);
      const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
      window.open(url, '_blank');
      closeModal();
      modalForm.reset();
    });
  }

  // 7. Accordion FAQ
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close others
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        // Toggle current
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // Activate first FAQ by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    firstItem.classList.add('active');
    const firstAnswer = firstItem.querySelector('.faq-answer');
    if (firstAnswer) firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
  }

  // 8. Floating WhatsApp Click Handler
  const floatingWaBtn = document.getElementById('floatingWaBtn');
  const floatingWaTooltip = document.getElementById('floatingWaTooltip');
  
  const openDirectWhatsApp = () => {
    const defaultMsg = encodeURIComponent('السلام عليكم مؤسسة الدفاع، أرغب في استفسار تنفيذي بخصوص تأسيس الشركات وتراخيص المصانع وخدمات المستثمرين.');
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${defaultMsg}`, '_blank');
  };

  if (floatingWaBtn) {
    floatingWaBtn.addEventListener('click', openDirectWhatsApp);
  }
  if (floatingWaTooltip) {
    floatingWaTooltip.addEventListener('click', openDirectWhatsApp);
  }
});
