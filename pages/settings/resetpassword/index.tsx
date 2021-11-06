import Link from "next/link";
import { useForm } from "react-hook-form";
import { AuthService } from "../../_api/Auth";

const ResetPassword = () => {

  const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    AuthService().resetPassword({
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    })
  }

  return (
    <div className="middle-sidebar-left">
      <div className="middle-wrap">
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body w-100 bg-reset-pass border-0 p-4 d-flex align-items-sm-center rounded-3">
            <Link href="/settings">
              <i className="feather-arrow-left font-xl text-white cursor-pointer" />
            </Link>
            <h4 className="font-xs text-white fw-600 ms-4 mb-0">Change Password</h4>
          </div>
          <div className="card-body p-lg-5 p-4 w-100 border-0">
            <form id='delform' onSubmit={handleSubmit(onSubmit)} >
              <div className="row">
                <div className="col-lg-12 mb-3">
                  <div className="form-gorup">
                    <label className="mont-font fw-600 font-xssss">Current Password</label>
                    <input {...register("currentPassword")} type="text" className="form-control" />
                  </div>
                </div>

                <div className="col-lg-12 mb-3">
                  <div className="form-gorup">
                    <label className="mont-font fw-600 font-xssss">Change Password</label>
                    <input {...register("newPassword")} type="text" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mb-3">
                  <div className="form-gorup">
                    <label className="mont-font fw-600 font-xssss">Confirm Change Password</label>
                    <input {...register("newRePassword")} type="text" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 mb-0">
                  {/* <button className='className="bg-reset-pass text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"' type='submit'> */}
                  {/* SALAM */}
                  {/* </button> */}
                  <a
                    onClick={() => onSubmit(getValues())}
                    // onClick="document.getElementById('delform').onsubmit();"
                    className="bg-reset-pass text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block">Save</a>
                </div>
              </div>
              {/* <input  /> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword