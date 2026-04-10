import Swal from 'sweetalert2';

const SwalMixin = {
  methods: {
    showSwalToast(icon, title) {
      Swal.fire({
        toast: true,
        position: 'top',
        icon,
        title,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        width: 'auto',
      });
    },
    showSwalCheck(icon, title, onConfirm) {
      Swal.fire({
        title,
        icon,
        showCancelButton: true,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        reverseButtons: true,
        customClass: {
          confirmButton: 'swal-btn-check',
          cancelButton: 'swal-btn-cancel',
        },
      }).then((result) => {
        if (result.isConfirmed && typeof onConfirm === 'function') {
          onConfirm();
        }
      });
    },
  },
};

export default SwalMixin;
