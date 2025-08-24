import React, { useEffect, useState } from "react";
import vulnerabilities from "./data";

export function KicsScan() {
    const [vulnerabilityData, setvulnerabilityData] = useState([]);
    const [selectedVulnerability, setselectedVulnerability] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const severityColors = {
        Critical: "bg-red-700 text-white",
        High: "bg-orange-500 text-white",
        Medium: "bg-amber-400 text-gray-900",
        Low: "bg-emerald-500 text-white",
    };
    useEffect(()=> {
        setvulnerabilityData(vulnerabilities);
    },[])
    if (!vulnerabilityData) return <div className="text-center p-6">Loading...</div>;
    const totalPages = Math.ceil(vulnerabilityData.length / rowsPerPage);
    const paginatedData = vulnerabilityData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    return (
        <div className="max-w-6xl mx-auto my-10 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Git Leaks</h1>
                <p className="text-gray-500 mt-1">Detected vulnerabilities from repository scan</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sno</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Secret Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Secret Type</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Severity Level</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(paginatedData) &&
                        paginatedData.map((vulnerability, indx) => (
                            <tr
                            key={indx}
                            className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50 transition-colors"
                            >
                                <td className="px-4 py-3 text-sm text-gray-700">{(currentPage - 1) * rowsPerPage + indx + 1}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-800">{vulnerability.secret_name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{vulnerability.secret_type}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center justify-center w-20 h-7 text-sm font-semibold rounded-md shadow-sm ${
                                            severityColors[vulnerability.severity_level] || "bg-gray-300 text-gray-800"
                                        }`}
                                    >
                                        {vulnerability.severity_level}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                                        onClick={()=>setselectedVulnerability(vulnerability)}
                                    >
                                    View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center items-center gap-4 mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            {selectedVulnerability && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
                        <button
                            onClick={() => setselectedVulnerability(null)}
                            className="absolute top-3 right-4 flex items-center justify-center w-8 h-8 rounded-full 
                                        bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 
                                        transition duration-200 shadow-sm"
                            aria-label="Close"
                        >X</button>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Source Details</h2>
                        <div className="text-sm">
                            <div className="bg-gray-900 text-gray-100 rounded-lg overflow-hidden shadow-md">
                                <div className="bg-gray-800 px-4 py-2 text-xs text-gray-300">
                                    <span>{selectedVulnerability.affected_file_path}</span>
                                </div>
                                <pre className="px-4 py-3 text-sm overflow-x-auto flex gap-4 items-center">
                                    <span className="text-gray-400">{selectedVulnerability.line_number}</span>
                                    <code>{selectedVulnerability.code_snippet}</code>
                                </pre>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 bg-gray-50 border rounded-lg p-4">
                            <div>
                                <p className="text-xs text-gray-500">Author</p>
                                <p className="font-medium">{selectedVulnerability.author}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Commit</p>
                                <p className="font-mono text-sm">{selectedVulnerability.commit_hash}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Date</p>
                                <p className="text-sm">{selectedVulnerability.timestamp}</p>
                            </div>
                        </div>

                        {/* Security Reference */}
                        <div className="mt-6">
                            <span className="font-bold text-gray-700">
                                Security Reference:{" "}
                            </span>
                            <a
                                href={`https://cwe.mitre.org/data/definitions/${selectedVulnerability.cwe.split(":")[0].split("-")[1]}.html`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {selectedVulnerability.cwe}
                            </a>
                        </div>
                        <div className="mt-5">
                            <span className="font-bold text-gray-700">
                                Remediation:{" "}
                            </span>
                            <span className="text-gray-600 leading-relaxed">
                                {selectedVulnerability.remediation}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}