<template>
  <section class="h-100">
    <div class="container h-100">
      <div class="row justify-content-sm-center h-100">
        <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
          <div class="text-center my-5">
            <a class="navbar-brand col-lg-3"
              >E-Commerce <span class="badge bg-primary">hub</span></a
            >
          </div>
          <div class="card shadow-lg">
            <div class="card-body p-5">
              <form class="needs-validation" autocomplete="off">
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    v-model="email"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <!-- <div class="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Password</label>
                </div> -->

                <!-- <div class="mb-3">
                  <div class="mb-2 w-100">
                    <a href="forgot.html" class="float-end">
                      Forgot Password?
                    </a>
                  </div>
                </div> -->
                <div class="d-flex justify-content-center mb-3">
                  <button
                    type="submit"
                    class="btn btn-outline-primary"
                    @click="setOTP()"
                  >
                    Send Verification Code
                  </button>
                </div>
                <div class="d-flex justify-content-center">
                  <p>Please enter OTP to verify your account</p>
                </div>
                <div class="d-flex justify-content-center">
                  <p>{{ otp }}</p>
                </div>
                <div class="d-flex flex-row justify-content-center">
                  <input
                    type="text"
                    class="m-2 form-control"
                    id="first"
                    maxlength="1"
                    v-model="first"
                  /><input
                    type="text"
                    class="m-2 form-control"
                    id="second"
                    maxlength="1"
                    v-model="second"
                  /><input
                    type="text"
                    class="m-2 form-control"
                    id="third"
                    maxlength="1"
                    v-model="third"
                  /><input
                    type="text"
                    class="m-2 form-control"
                    id="fourth"
                    maxlength="1"
                    v-model="fourth"
                  /><input
                    type="text"
                    class="m-2 form-control"
                    id="fifth"
                    maxlength="1"
                    v-model="fifth"
                  /><input
                    type="text"
                    class="m-2 form-control"
                    id="sixth"
                    maxlength="1"
                    v-model="sixth"
                  />
                </div>

                <div class="d-grid gap-2 mt-3">
                  <router-link
                    :to="{ name: 'console' }"
                    class="d-grid gap-2"
                    v-if="otp == (''+first+second+third+fourth+fifth+sixth) && otp != null"
                  >
                    <button type="submit" class="btn btn-primary">Login</button>
                  </router-link>
                  <button type="submit" class="btn btn-primary" v-else>
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div class="card-footer py-3 border-0">
              <div class="text-center">
                Don't have an account?
                <a class="text-dark">Create One</a>
              </div>
            </div>
          </div>
          <div class="text-center mt-5 text-muted">
            Copyright &copy; 2021-2022 &mdash; E-Commerce Solutions
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import emailjs from '@emailjs/browser';

export default {
  data() {
    return {
      otp: null,
      email: null,
      first: null,
      second: null,
      third: null,
      fourth: null,
      fifth: null,
      sixth: null,
    };
  },
  methods: {
    setOTP() {
      this.otp = Math.floor(100000 + Math.random() * 900000);
      // -----Send email to user-----
      // var templateParams = {
      //     userEmail: this.email,
      //     message: this.otp,
      // };
      // emailjs
      //   .send(
      //     'service_6y3feux',
      //     'template_rvh3hw5',
      //     templateParams,
      //     'KfDmy3MbqTlwBCuKI',
      //   )
      //   .then(
      //     (result) => {
      //       console.log('SUCCESS!', result.text);
      //     },
      //     (error) => {
      //       console.log('FAILED...', error.text);
      //     }
      //   );
      // -----------------------------
    },
    noInput() {
      alert('Please Input Correct Password');
    },
  },
};
// Timer OTP
</script>