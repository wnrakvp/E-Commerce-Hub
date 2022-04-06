<template>
  <section class="h-100">
    <div class="container h-100">
      <div class="row justify-content-sm-center h-100">
        <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
          <div class="text-center my-5">
            <!-- <img src="../assets/Vuejs.png"
            > -->
          </div>
          <div class="card shadow-lg">
            <div class="card-body p-5">
              <div class="d-flex justify-content-center mb-4">
                <a class="navbar-brand"
                  >E-Commerce <span class="badge bg-primary">hub</span></a
                >
              </div>
              <form class="needs-validation mt-3" autocomplete="off">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Email address"
                    v-model="email"
                    :disabled="isLogin == true"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    v-model="password"
                    :disabled="isLogin == true"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="d-grid gap-2 mb-3">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    @click="validateUser()"
                    v-bind:hidden="isLogin == true"
                  >
                    Login
                  </button>
                </div>
                <!-- <div class="mb-3">
                  <div class="mb-2 w-100">
                    <a href="forgot.html" class="float-end">
                      Forgot Password?
                    </a>
                  </div>
                </div> -->
                <div class="d-flex justify-content-center mt-3">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="setOTP()"
                    v-show="isLogin"
                  >
                    Send Verification Code
                  </button>
                </div>
                <div class="d-flex justify-content-center mt-3">
                  <p style="text-align:center" v-show="isVerify">
                    Verification Code is sent to <br><strong>{{email}}</strong>.<br>
                    Please enter OTP to verify your account<br> {{otp}}
                  </p>
                </div>
                <div class="d-flex flex-row justify-content-center">
                  <input
                    type="text"
                    class="m-2 form-control"
                    id="first"
                    maxlength="1"
                    v-model="first"
                    v-show="isVerify"
                  /><input
                    type="text"
                    class="m-2 form-control"
                    id="second"
                    maxlength="1"
                    v-model="second"
                    v-show="isVerify"
                  /><input
                    type="text"
                    class="m-2 form-control"
                    id="third"
                    maxlength="1"
                    v-model="third"
                    v-show="isVerify"
                  /><input
                    type="text"
                    class="m-2 form-control"
                    id="fourth"
                    maxlength="1"
                    v-model="fourth"
                    v-show="isVerify"
                  /><input
                    type="text"
                    class="m-2 form-control"
                    id="fifth"
                    maxlength="1"
                    v-model="fifth"
                    v-show="isVerify"
                  /><input
                    type="text"
                    class="m-2 form-control"
                    id="sixth"
                    maxlength="1"
                    v-model="sixth"
                    v-show="isVerify"
                  />
                </div>

                <div class="d-grid gap-2 mt-3">
                  <router-link
                    :to="{ name: 'console' }"
                    class="d-grid gap-2"
                    v-if="
                      otp ==
                        '' + first + second + third + fourth + fifth + sixth &&
                      otp != null
                    "
                  >
                    <button type="submit" class="btn btn-primary">
                      Verify
                    </button>
                  </router-link>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    v-else
                    v-show="isVerify"
                    @click="noOTP()"
                  >
                    Verify
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
      password: null,
      first: null,
      second: null,
      third: null,
      fourth: null,
      fifth: null,
      sixth: null,
      isLogin: false,
      isVerify: false,
    };
  },
  methods: {
    validateUser() {
      const regEx =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.email != null && this.email.match(regEx)) {
        if (this.password == 123456789) {
          this.isLogin = true;
          } else {
          alert('Please input correct password');
        }
      } else {
        alert('Please input valid email.');
      }
    },
    setOTP() {
      this.otp = Math.floor(100000 + Math.random() * 900000);
      setTimeout(() => {this.otp = null;}, 10000) // 10 seconds OTP disappered
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
      this.isVerify = true;
    },
    noOTP() {
      alert('Please Input Correct OTP or Your OTP has timed out.');
    },
  },
};
</script>
