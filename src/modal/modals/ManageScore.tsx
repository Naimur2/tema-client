// @ts-nocheck
import Modal from "modal/components/Modal";
import React from "react";
import { useGetEventsQuery } from "store/apis/event";
import {
  useDeleteScoreMutation,
  useGetScoreQuery,
  useUpdateScoreMutation,
} from "store/apis/score";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import MySwal from "components/MySwal";

export interface IManageScore {
  teamId: string;
}

const validationSchema = Yup.object({
  score: Yup.number("Score Should be number")
    .required("Score is required")
    .min(0, "Min score is 0"),
  eventId: Yup.string().required("Event is required"),
});

export default function ManageScore({ teamId }: Readonly<IManageScore>) {
  const { data } = useGetScoreQuery(teamId);
  const { data: eventsData } = useGetEventsQuery();

  const [updateScore, { isLoading: isUpdatingScore }] =
    useUpdateScoreMutation();
  const [deleteScore, { isLoading: isDeleting }] = useDeleteScoreMutation();

  const formik = useFormik({
    initialValues: {
      score: data?.score,
      eventId: data?.event?._id,
    },
    onSubmit: async (values) => {
      try {
        // show loading
        MySwal.fire({
          title: "Please wait",
          html: "Updating Score",
          didOpen: () => {
            MySwal.showLoading();
          },
        });
        await updateScore({ ...values, teamId }).unwrap();
        formik.resetForm();
        MySwal.fire({
          title: "Success",
          html: "Score updated successfully",
          icon: "success",
        });
      } catch (error) {
        MySwal.fire(
          "Error",
          error?.data?.message ?? "Something went wrong",
          "error"
        );
      }
    },
    validationSchema,
  });

  const valuesForSelect = React.useMemo(() => {
    const filteredEvents = eventsData?.data?.filter((event) => {
      const isEventAlreadyAdded = data?.data?.find(
        (score) => score.event?._id === event._id
      );
      return !isEventAlreadyAdded;
    });

    console.log({ filteredEvents });

    return filteredEvents?.map((event) => ({
      value: event._id,
      label: event.name,
    }));
  }, [eventsData, data?.data]);

  console.log(valuesForSelect);

  const handleDelete = async (scoreId: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this score!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteScore(scoreId).unwrap();
        MySwal.fire("Deleted!", "Score has been deleted.", "success");
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "Score is safe :)", "error");
      }
    });
  };

  return (
    <Modal modalId="ManageScore" closeOnBackdropClick>
      <Modal.Content className="!min-h-[calc(100vh-50%)] !max-h-[calc(100vh-10%)] !top-[5%] !overflow-y-auto grid  relative !pt-0">
        <div className="grid gap-4 sticky top-0 bg-white py-4">
          <Modal.Header
            title="Manage Score"
            titleClassName="!font-bold !text-2xl"
          />

          <form className="grid gap-4" onSubmit={formik.handleSubmit}>
            <div className="grid gap-2">
              <label htmlFor="teamId">Score</label>
              <input
                id="teamId"
                label="Score"
                type="number"
                value={data?.score}
                className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="score"
                {...formik.getFieldProps("score")}
              />
              {formik.touched.score && formik.errors.score ? (
                <div className="text-red-600">{formik.errors.score}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <label htmlFor="eventId">Select Event</label>
              <Select
                isClearable
                isSearchable={false}
                options={valuesForSelect}
                inputId="eventId"
                onBlur={formik.handleBlur}
                name="eventId"
                {...formik.getFieldProps("eventId")}
                onChange={(option) => {
                  formik.setFieldValue("eventId", option?.value);
                }}
                value={valuesForSelect?.find(
                  (option) => option.value === formik.values.eventId
                )}
              />
              {formik.touched.eventId && formik.errors.eventId ? (
                <div className="text-red-600">{formik.errors.eventId}</div>
              ) : null}
            </div>

            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-500 text-white px-4 py-3 rounded-md mt-4"
            >
              Save
            </button>
          </form>
          <div
            className="grid grid-cols-3 gap-2 items-center
                border border-gray-300 rounded-md px-4 py-2
                "
          >
            <div>
              <h4 className="font-bold">Event</h4>
            </div>
            <div>
              <h4 className="font-bold">Score</h4>
            </div>
            <div className="">
              <h4 className="font-bold">Actions</h4>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {data?.data?.map((score) => {
            return (
              <div
                className="grid grid-cols-3 gap-2 items-center
                border border-gray-300 rounded-md px-4 py-2
                "
              >
                <div>{score.event?.name}</div>
                <div>{score.score}</div>
                <div className="grid gap-4 grid-cols-2">
                  <button
                    className="bg-red-700 hover:bg-red-500 text-white px-3 py-2 rounded-md"
                    onClick={() => handleDelete(score?._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-primary-700 hover:bg-primary-500 text-white px-3 py-2 rounded-md"
                    onClick={() => {
                      formik.setFieldValue("eventId", score.event?._id);
                      formik.setFieldValue("score", score.score);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Modal.Content>
    </Modal>
  );
}
